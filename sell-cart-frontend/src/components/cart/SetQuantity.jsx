const SetQuantity = ({
  quantity,
  cardCounter,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button
          className="border-[1.2px] border-slate-800 px-3 py-1 rounded"
          onClick={handleQuantityDecrease}
        >
          -
        </button>
        <h5 className="text-red-500 text-md">{quantity}</h5>
        <button
          className="border-[1.2px] border-slate-800 px-3 py-1 rounded"
          onClick={handleQuantityIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
