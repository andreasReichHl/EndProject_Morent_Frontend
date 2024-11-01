import houseSvg from "../assets/images/house.svg";
export default function ListStoreElement({
    name,
    city,
    address,
    zipcode,
    houseNumber,
    country,
    onSelect,
}) {
    return (
        <div
            onClick={onSelect}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded flex items-start"
        >
            <img src={houseSvg} alt="house" className="pr-3 w-8 h-8" />
            <div className="flex flex-col">
                <p className="font-semibold">{name}</p>
                <p>{`${address} ${houseNumber}, ${zipcode} ${city}`}</p>
                <p>{country}</p>
            </div>
        </div>
    );
}
