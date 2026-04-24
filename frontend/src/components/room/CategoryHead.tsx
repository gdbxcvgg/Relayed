import type { RoomNodeType, RoomType } from "../../types/room";

type CategoryHeadProps = {
    category: RoomNodeType;
    isServerOwner: boolean;
    toggleHidden: (id: string) => void;
    handleCreate: (category: RoomType | null) => void;
};

const CategoryHead = (props: CategoryHeadProps) => {
    if (!props.category.room) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                {props.category.room?.name}
                <img
                    src="/arrow-down.png"
                    className={
                        props.category.hidden ? "w-4 h-4 -rotate-90" : "w-4 h-4"
                    }
                    onClick={() =>
                        props.toggleHidden(props.category.room?.id ?? "")
                    }
                />
            </div>

            {props.isServerOwner && (
                <div
                    className="text-xl hover:cursor-pointer"
                    onClick={() =>
                        props.handleCreate(props.category.room ?? null)
                    }
                >
                    +
                </div>
            )}
        </div>
    );
};

export default CategoryHead;
