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
            <div
                className="flex-1 min-w-0 flex items-center gap-1 cursor-pointer"
                onClick={() =>
                    props.toggleHidden(props.category.room?.id ?? "")
                }
            >
                <div className="truncate p-0">{props.category.room?.name}</div>
                <img
                    src="/arrow-down.png"
                    className={
                        props.category.hidden ? "size-4 -rotate-90" : "size-4"
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
