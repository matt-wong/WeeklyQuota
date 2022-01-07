export interface quotaTopic {
    name: string;
    icon: string;
    quota: number;
    // valueOptions: number[];
    daysValues: dayValues[];
    weekComment?: string;
}

export interface dayValues {
    planned: number;
    completed: number;
}

export const zeroValDay : dayValues = {completed: 0, planned: 0};