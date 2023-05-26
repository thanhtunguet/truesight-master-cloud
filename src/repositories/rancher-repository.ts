import { AxiosRequestConfig } from 'axios';
import { Repository } from 'react3l';
import { RancherDeployment } from '../models/deployment';
import {
  RancherCluster,
  RancherClusterResponse as RancherResponse
} from '../models/rancher';
import { RancherUserResponse } from '../models/user';
import { store } from '../store';

class RancherRepository extends Repository {
  constructor() {
    super();
    this.http.interceptors.request.use(this.requestInterceptor);
    this.baseURL = 'https://rancher.truesight.asia';
  }

  private readonly requestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const { token } = store.getState().rancher;

    Object.assign(config.headers, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return config;
  };

  public clusters() {
    return this.http
      .get('/v3/clusters')
      .pipe(Repository.responseDataMapper<RancherResponse<RancherCluster[]>>());
  }

  public deployments(clusterId: string) {
    return this.http
      .get(`/k8s/clusters/${clusterId}/v1/apps.deployments`)
      .pipe(
        Repository.responseDataMapper<RancherResponse<RancherDeployment[]>>(),
      );
  }

  public me() {
    return this.http
      .get(`/v3/users`, {
        params: {
          me: 'true',
        },
      })
      .pipe(Repository.responseDataMapper<RancherUserResponse>());
  }

  public users() {
    return this.http
      .get(`/v3/users`)
      .pipe(Repository.responseDataMapper<RancherUserResponse>());
  }

  public redeploy(clusterId: string, deploymentId: string, deployment: RancherDeployment) {
    return this.http.put(`k8s/clusters/${clusterId}/v1/apps.deployments/${deploymentId}`, deployment)
      .pipe(
        Repository.responseDataMapper<RancherDeployment>()
      )
  }
}

export const rancherRepository = new RancherRepository();
