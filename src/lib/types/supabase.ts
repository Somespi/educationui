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
      book: {
        Row: {
          id: number
          name: string | null
          pin: number | null
          reference: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          pin?: number | null
          reference?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          pin?: number | null
          reference?: string | null
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          formid: string | null
          link: string | null
          name: string
          pin: number | null
          subject: number | null
          uuid: string
        }
        Insert: {
          formid?: string | null
          link?: string | null
          name: string
          pin?: number | null
          subject?: number | null
          uuid: string
        }
        Update: {
          formid?: string | null
          link?: string | null
          name?: string
          pin?: number | null
          subject?: number | null
          uuid?: string
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          content: string | null
          name: string | null
          pin: number
          subject: string | null
          uuid: string
        }
        Insert: {
          content?: string | null
          name?: string | null
          pin: number
          subject?: string | null
          uuid: string
        }
        Update: {
          content?: string | null
          name?: string | null
          pin?: number
          subject?: string | null
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
