import React, { useEffect, useState } from "react";
import { getProductById } from "../../utilities/db";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";

const IndividualProduct = () => {
  const { id } = useParams();

  const [state, setState] = useState({});
  useEffect(() => {
    (async () => {
      const productData = await getProductById(id);
      setState(productData);
      console.log(productData);
    })();
  }, [id]);
  return (
    <div className={` container mx-auto mt-[100px]`}>
      <div>
        <div className="flex">
          <img
            style={{ maxHeight: 416, maxWidth: 416 }}
            src={state?.image}
            alt="banner"
            border={0}
          />
          <div className="ml-10">
            <div className=" flex min-h-[48px] bg-[#fffeeb] text-black border-r-2 border-[1px] border-solid border-blue px-[4px] py-[12px] mb-[15px] items-center">
              <img
                className="mr-3"
                height={5}
                width={45}
                src="../black-friday.avif"
                alt="Broken"
              />

              <h1>
                {" "}
                BLACK FRIDAY SALE ENDS IN{" "}
                <Countdown date={Date.now() + 1000000000} />,
              </h1>
            </div>
            <div className="mt-[60px]">
              <h1 className="text-2xl">{state?.title}</h1>
              <h1 style={{fontSize: 12, verticalAlign:"middle"}} className=" inline-block text-white pt-[2px] pr-[2px] pb-[2px] pl-[6px] rounded-[3px] font-bold bg-[#388e3c] mt-2">Rating: {state?.rating?.rate}</h1>
              <h1 className="text-[#878787] font-medium mt-2">{state?.rating?.count} reviews</h1>
              <h1 className="text-[#388e3c] font-bold mt-2">Special Price: {`$${state?.price}`}</h1>
              <h1 className="mt-2"><span className="font-semibold">Category:</span> {state?.category?.toUpperCase()}</h1>

              <p className="mt-2"><span className="font-semibold">Description:</span> {state?.description} reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
