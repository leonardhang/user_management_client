import { ReactNode } from 'react';

export interface RouteModel {
    key?: string;
    path: string;
    element?: ReactNode;
    title: string;
    icon?: ReactNode;
    children?: RouteModel[];
}