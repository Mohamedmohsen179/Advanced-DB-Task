'use client';

// Reusable delete button component with confirmation
interface DeleteButtonProps {
  onDelete: () => void;
  itemName?: string;
  className?: string;
}

export default function DeleteButton({
  onDelete,
  itemName,
  className = '',
}: DeleteButtonProps) {
  const handleClick = () => {
    if (
      confirm(
        itemName
          ? `Are you sure you want to delete ${itemName}?`
          : 'Are you sure you want to delete this item?'
      )
    ) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-4 py-2 bg-red-600 text-white rounded-lg
        hover:bg-red-700 transition-colors
        ${className}
      `}
    >
      Delete
    </button>
  );
}

