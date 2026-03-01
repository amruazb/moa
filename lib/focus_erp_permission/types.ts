// ERP Permission Request Form Types

export interface ERPPermissionRequest {
    employeeName: string;
    department: string;
    jobTitle: string;
    permissionsRequested: string; // System/Service to be accessed
    accessTime: 'Permanent' | 'Temporary';
    reasonForRequest: string;
    preparedBy: string; // IT Person (optional, usually fills the form)
    supervisorRecommendation: string;
    lineManagerName: string;
    lineManagerJobTitle: string;
    lineManagerDate: string;
    date: string;
}

export interface ERPPermissionData {
    employeeName?: string;
    department?: string;
    jobTitle?: string;
    permissionsRequested?: string;
    accessTime?: 'Permanent' | 'Temporary';
    reasonForRequest?: string;
    preparedBy?: string;
    supervisorRecommendation?: string;
    lineManagerName?: string;
    lineManagerJobTitle?: string;
    lineManagerDate?: string;
    date?: string;
}

export function extractERPPermissionContext(data: ERPPermissionData): ERPPermissionRequest {
    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    return {
        employeeName: data.employeeName || '',
        department: data.department || '',
        jobTitle: data.jobTitle || '',
        permissionsRequested: data.permissionsRequested || '',
        accessTime: data.accessTime || 'Permanent',
        reasonForRequest: data.reasonForRequest || '',
        preparedBy: data.preparedBy || '',
        supervisorRecommendation: data.supervisorRecommendation || '',
        lineManagerName: data.lineManagerName || '',
        lineManagerJobTitle: data.lineManagerJobTitle || '',
        lineManagerDate: data.lineManagerDate || '',
        date: data.date || today,
    };
}
