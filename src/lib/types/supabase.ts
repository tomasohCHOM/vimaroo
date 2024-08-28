export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string;
					email: string | null;
					id: string;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					id: string;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					id?: string;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			user_stats: {
				Row: {
					containers_accuracy: number | null;
					containers_deletions_correct: number | null;
					containers_deletions_total: number | null;
					containers_tests_completed: number | null;
					containers_total_time: number | null;
					created_at: string;
					horizontal_accuracy: number | null;
					horizontal_deletions_correct: number | null;
					horizontal_deletions_total: number | null;
					horizontal_tests_completed: number | null;
					horizontal_total_time: number | null;
					id: string;
					lines_accuracy: number | null;
					lines_deletions_correct: number | null;
					lines_deletions_total: number | null;
					lines_tests_completed: number | null;
					lines_total_time: number | null;
					mixed_accuracy: number | null;
					mixed_deletions_correct: number | null;
					mixed_deletions_total: number | null;
					mixed_tests_completed: number | null;
					mixed_total_time: number | null;
					movement_accuracy: number | null;
					movement_deletions_correct: number | null;
					movement_deletions_total: number | null;
					movement_tests_completed: number | null;
					movement_total_time: number | null;
					tests_completed: number | null;
					tests_started: number | null;
					user_id: string | null;
				};
				Insert: {
					containers_accuracy?: number | null;
					containers_deletions_correct?: number | null;
					containers_deletions_total?: number | null;
					containers_tests_completed?: number | null;
					containers_total_time?: number | null;
					created_at?: string;
					horizontal_accuracy?: number | null;
					horizontal_deletions_correct?: number | null;
					horizontal_deletions_total?: number | null;
					horizontal_tests_completed?: number | null;
					horizontal_total_time?: number | null;
					id?: string;
					lines_accuracy?: number | null;
					lines_deletions_correct?: number | null;
					lines_deletions_total?: number | null;
					lines_tests_completed?: number | null;
					lines_total_time?: number | null;
					mixed_accuracy?: number | null;
					mixed_deletions_correct?: number | null;
					mixed_deletions_total?: number | null;
					mixed_tests_completed?: number | null;
					mixed_total_time?: number | null;
					movement_accuracy?: number | null;
					movement_deletions_correct?: number | null;
					movement_deletions_total?: number | null;
					movement_tests_completed?: number | null;
					movement_total_time?: number | null;
					tests_completed?: number | null;
					tests_started?: number | null;
					user_id?: string | null;
				};
				Update: {
					containers_accuracy?: number | null;
					containers_deletions_correct?: number | null;
					containers_deletions_total?: number | null;
					containers_tests_completed?: number | null;
					containers_total_time?: number | null;
					created_at?: string;
					horizontal_accuracy?: number | null;
					horizontal_deletions_correct?: number | null;
					horizontal_deletions_total?: number | null;
					horizontal_tests_completed?: number | null;
					horizontal_total_time?: number | null;
					id?: string;
					lines_accuracy?: number | null;
					lines_deletions_correct?: number | null;
					lines_deletions_total?: number | null;
					lines_tests_completed?: number | null;
					lines_total_time?: number | null;
					mixed_accuracy?: number | null;
					mixed_deletions_correct?: number | null;
					mixed_deletions_total?: number | null;
					mixed_tests_completed?: number | null;
					mixed_total_time?: number | null;
					movement_accuracy?: number | null;
					movement_deletions_correct?: number | null;
					movement_deletions_total?: number | null;
					movement_tests_completed?: number | null;
					movement_total_time?: number | null;
					tests_completed?: number | null;
					tests_started?: number | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "user_stats_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;
