export interface HTTPAdapter {
    get<T>(url: string): Promise<T>;
}