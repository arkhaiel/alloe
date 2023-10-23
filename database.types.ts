export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chapters: {
        Row: {
          author: string | null
          created_at: string | null
          id: string
          is_version: boolean | null
          public: boolean | null
          require_review: boolean | null
          text: string | null
          versions: Json[] | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: string
          is_version?: boolean | null
          public?: boolean | null
          require_review?: boolean | null
          text?: string | null
          versions?: Json[] | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: string
          is_version?: boolean | null
          public?: boolean | null
          require_review?: boolean | null
          text?: string | null
          versions?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_author_fkey"
            columns: ["author"]
            referencedRelation: "user_view"
            referencedColumns: ["id"]
          }
        ]
      }
      parchild: {
        Row: {
          enfant: string
          parent: string
        }
        Insert: {
          enfant: string
          parent: string
        }
        Update: {
          enfant?: string
          parent?: string
        }
        Relationships: [
          {
            foreignKeyName: "parchild_enfant_fkey"
            columns: ["enfant"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parchild_parent_fkey"
            columns: ["parent"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          }
        ]
      }
      readings: {
        Row: {
          created_at: string
          id: string
          root_chapter: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          root_chapter?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          root_chapter?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "readings_root_chapter_fkey"
            columns: ["root_chapter"]
            referencedRelation: "root_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "readings_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "readings_user_fkey"
            columns: ["user"]
            referencedRelation: "user_view"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          after_review: string | null
          before_review: string | null
          commentaire: string | null
          created_at: string
          id: number
          reviewer: string | null
        }
        Insert: {
          after_review?: string | null
          before_review?: string | null
          commentaire?: string | null
          created_at?: string
          id?: number
          reviewer?: string | null
        }
        Update: {
          after_review?: string | null
          before_review?: string | null
          commentaire?: string | null
          created_at?: string
          id?: number
          reviewer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_after_review_fkey"
            columns: ["after_review"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_before_review_fkey"
            columns: ["before_review"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_fkey"
            columns: ["reviewer"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_fkey"
            columns: ["reviewer"]
            referencedRelation: "user_view"
            referencedColumns: ["id"]
          }
        ]
      }
      root_chapters: {
        Row: {
          chapter: string | null
          context: string | null
          created_at: string
          id: string
          target: number | null
          title: string | null
        }
        Insert: {
          chapter?: string | null
          context?: string | null
          created_at?: string
          id?: string
          target?: number | null
          title?: string | null
        }
        Update: {
          chapter?: string | null
          context?: string | null
          created_at?: string
          id?: string
          target?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "root_chapters_chapter_fkey"
            columns: ["chapter"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          last_connection: string | null
          mailing: boolean | null
          prefColor: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          last_connection?: string | null
          mailing?: boolean | null
          prefColor?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          last_connection?: string | null
          mailing?: boolean | null
          prefColor?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_view: {
        Row: {
          id: string | null
          username: string | null
        }
        Insert: {
          id?: string | null
          username?: string | null
        }
        Update: {
          id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
