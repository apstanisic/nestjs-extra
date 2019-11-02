export interface AccessOptions {
    action: 'read' | 'write';
    resource?: string;
}
export declare function SetRequiredAccess(options: AccessOptions): any;
