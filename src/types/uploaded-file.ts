export type FileContent = {
    name: string;
    content?: string;
}

export type FileContentSerialized = {
    name: string;
    content?: Record<string, string>;
}
