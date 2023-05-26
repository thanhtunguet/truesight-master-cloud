interface Links {
  remove: string;
  self: string;
  update: string;
  view: string;
}

interface Annotations {
  'deployment.kubernetes.io/revision': string;
}

interface FieldsV1 {
  f: Metadata;
  manager: string;
  operation: string;
  time: string;
}

interface Metadata {
  annotations: Annotations;
  creationTimestamp: string;
  fields: any[]; // Specify the appropriate type for the "fields" array
  generation: number;
  labels: {[key: string]: string};
  managedFields: FieldsV1[];
  name: string;
  namespace: string;
  ownerReferences: OwnerReference[];
  relationships: Relationship[];
  resourceVersion: string;
  state: {
    error: boolean;
    message: string;
    name: string;
    transitioning: boolean;
  };
  uid: string;
}

interface OwnerReference {
  apiVersion: string;
  blockOwnerDeletion: boolean;
  controller: boolean;
  kind: string;
  name: string;
  uid: string;
}

interface Relationship {
  toType?: string;
  toNamespace?: string;
  toId?: string;
  rel: string;
  selector?: string;
  fromId?: string;
  fromType?: string;
  state: string;
  message: string;
}

interface Spec {
  progressDeadlineSeconds: number;
  replicas: number;
  revisionHistoryLimit: number;
  selector: {
    matchLabels: {[key: string]: string};
  };
  strategy: {
    type: string;
  };
  template: {
    metadata: {
      creationTimestamp: string | null;
      labels: {[key: string]: string};
      name: string;
      namespace: string;
    };
    spec: {
      containers: Container[];
      dnsPolicy: string;
      nodeSelector: {[key: string]: string};
      priorityClassName: string;
      restartPolicy: string;
      schedulerName: string;
      securityContext: object;
      serviceAccount: string;
      serviceAccountName: string;
      terminationGracePeriodSeconds: number;
      tolerations: {effect: string; key?: string; operator?: string}[];
    };
  };
}

interface Container {
  env: Env[];
  image: string;
  imagePullPolicy: string;
  livenessProbe: Probe;
  name: string;
  readinessProbe: Probe;
  resources: object;
  terminationMessagePath: string;
  terminationMessagePolicy: string;
}

interface Env {
  name: string;
  value: string;
}

interface Probe {
  exec: {
    command: string[];
  };
  failureThreshold: number;
  initialDelaySeconds: number;
  periodSeconds: number;
  successThreshold: number;
  timeoutSeconds: number;
}

interface Status {
  availableReplicas: number;
  conditions: Condition[];
  observedGeneration: number;
  readyReplicas: number;
  replicas: number;
  updatedReplicas: number;
}

interface Condition {
  error: boolean;
  lastTransitionTime: string;
  lastUpdateTime: string;
  message: string;
  reason: string;
  status: string;
  transitioning: boolean;
  type: string;
}

export interface RancherDeployment {
  id: string;
  type: string;
  links: Links;
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: Spec;
  status: Status;
}
