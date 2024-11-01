export default function ListStoreElement({ name, onSelect }) {
    return (
        <div
            onClick={onSelect}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
            <p>{name}</p>
        </div>
    );
}
