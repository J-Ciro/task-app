import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from 'firebase/remote-config';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private remoteConfig: RemoteConfig;
  private featureStatusMap = new Map<string, BehaviorSubject<boolean>>();

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.remoteConfig = getRemoteConfig(app);
    this.remoteConfig.defaultConfig = {
      add_task_feature_enabled: true,
    };
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: environment.production ? 3600000 : 30000,
      fetchTimeoutMillis: 60000,
    };
  }

  public async initializeRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      this.updateAllFeatureStatuses();
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }

  public async refreshRemoteConfig(): Promise<boolean> {
    try {
      const refreshed = await fetchAndActivate(this.remoteConfig);
      if (refreshed) {
        this.updateAllFeatureStatuses();
      }
      return refreshed;
    } catch (error) {
      console.error('Error refreshing remote config:', error);
      return false;
    }
  }

  private updateAllFeatureStatuses(): void {
    this.featureStatusMap.forEach((subject, key) => {
      const newValue = this.getFeatureValueDirectly(key);
      if (subject.value !== newValue) {
        subject.next(newValue);
      }
    });
  }

  private getFeatureValueDirectly(featureKey: string): boolean {
    const value = getValue(this.remoteConfig, featureKey);
    return value.asBoolean();
  }

  public isFeatureEnabled(featureKey: string): boolean {
    return this.getFeatureValueDirectly(featureKey);
  }

  public watchFeature(featureKey: string): Observable<boolean> {
    if (!this.featureStatusMap.has(featureKey)) {
      const initialValue = this.getFeatureValueDirectly(featureKey);
      this.featureStatusMap.set(
        featureKey,
        new BehaviorSubject<boolean>(initialValue)
      );
    }
    return this.featureStatusMap.get(featureKey)!.asObservable();
  }

  public setupAutoRefresh(intervalMs: number = 60): void {
    setInterval(() => {
      this.refreshRemoteConfig().then((changed) => {
        if (changed) {
          console.log('Remote config updated automatically');
        }
      });
    }, intervalMs);
  }
}
