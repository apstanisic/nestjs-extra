export interface AccessResourceOptions {
    action: 'read' | 'create' | 'update' | 'delete';
    resource?: string;
}
export declare function SetRequiredAccess(options: AccessResourceOptions): any;
