export interface Filter {
	field: string;
	name: string;
	operator: 'match' | 'between' | 'none' | 'like' | 'in';
	value: string;
	type: 'text' | 'number' | 'date' | 'select' | 'none';
	options?: string;
}