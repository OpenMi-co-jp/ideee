import { createContext, useContext, useState, ReactNode } from 'react'
import { GetCommentQuery } from '@/lib/generated/client'

// コメントの型を定義します（適宜調整してください）
type CommentType = GetCommentQuery['comment']

// コンテキストの型を定義します
interface CommentContextType {
  comment: CommentType
  isEditing: boolean // isEditingの状態を追加
  setIsEditing: (isEditing: boolean) => void
}

// コンテキストを作成します（初期値は必要に応じて調整してください）
const CommentContext = createContext<CommentContextType | null>(null)

// コンテキストプロバイダーコンポーネントを作成します
export const CommentProvider = ({
  children,
  comment: initialComment,
}: {
  children: ReactNode
  comment: CommentType
}) => {
  const [isEditing, setIsEditing] = useState(false)

  // 編集状態を更新する関数
  const handleSetIsEditing = (newIsEditing: boolean) => {
    setIsEditing(newIsEditing)
  }

  return (
    <CommentContext.Provider
      value={{
        comment: initialComment,
        isEditing,
        setIsEditing: handleSetIsEditing,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

// コンテキストを使用するためのカスタムフックを作成します
export const useComment = () => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider')
  }
  return context
}
