export type User = {
    id: number;
    name: string;
    email: string;
};

export interface Props {
    title: string;
    children: React.ReactNode;
}