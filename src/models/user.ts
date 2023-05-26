export interface RancherUserResponse {
  type: string;
  links: {
    self: string;
  };
  createTypes: {
    user: string;
  };
  actions: {
    changepassword: string;
    refreshauthprovideraccess: string;
  };
  pagination: {
    limit: number;
    total: number;
  };
  sort: {
    order: string;
    reverse: string;
    links: {
      [key: string]: string;
    };
  };
  filters: {
    created: null;
    creatorId: null;
    description: null;
    enabled: null;
    id: null;
    me: Array<{modifier: string; value: string}>;
    mustChangePassword: null;
    name: null;
    password: null;
    removed: null;
    state: null;
    transitioning: null;
    transitioningMessage: null;
    username: null;
    uuid: null;
  };
  resourceType: string;
  data: Array<{
    actions: {
      refreshauthprovideraccess: string;
      setpassword: string;
    };
    annotations: {
      [key: string]: string;
    };
    baseType: string;
    conditions: null;
    created: string;
    createdTS: number;
    creatorId: null;
    description: string;
    enabled: boolean;
    id: string;
    labels: {
      [key: string]: string;
    };
    links: {
      clusterRoleTemplateBindings: string;
      globalRoleBindings: string;
      projectRoleTemplateBindings: string;
      remove: string;
      self: string;
      tokens: string;
      update: string;
    };
    me: boolean;
    mustChangePassword: boolean;
    name: string;
    principalIds: string[];
    state: string;
    transitioning: string;
    transitioningMessage: string;
    type: string;
    username: string;
    uuid: string;
  }>;
}
