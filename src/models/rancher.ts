export interface RancherCluster {
  id: string;
  name: string;
  description: string;
  state: string;
  // Other cluster properties...
}

export interface RancherClusterResponse<T> {
  data: T;
  // Other response properties...
}
