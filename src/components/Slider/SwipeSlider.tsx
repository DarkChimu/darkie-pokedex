import Slider, { Settings } from "react-slick";
import { IoIosClose } from "react-icons/io";

export interface SwipeSliderProps {
  list: string[];
  currentValue: string;
  callback: (value: string) => void;
}

function SwipeToSlide({ list, currentValue, callback }: SwipeSliderProps) {
  const settings: Settings = {
    className: "mx-4",
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    useCSS: true,
  };

  const handleCallback = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<SVGElement, MouseEvent>,
    value: string
  ) => {
    event.stopPropagation();
    value === currentValue ? callback("all") : callback(value);
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {list?.map((op: string, index: number) => (
          <div key={`${index}-${op}`} className="relative">
            {currentValue === op && (
              <div className="absolute bg-white rounded-full xs:right-0 sm:right-2 top-0 z-10 cursor-pointer">
                <IoIosClose
                  color="black"
                  size={18}
                  onClick={(event) => {
                    handleCallback(event, op);
                  }}
                />
              </div>
            )}
            <div
              key={op}
              className={`flex items-center min-w-fit sm:mx-2 xs:mx-0.5 h-10 capitalize justify-center rounded-xl text-slate-300 type-bg ${op} ${
                op === currentValue ? "active" : ""
              }`}
            >
              <div
                className="flex items-center sm:gap-4 xs:gap-2"
                onClick={(event) => handleCallback(event, op)}
              >
                <img
                  src={`/icons/${op}.svg`}
                  alt={`${op} type`}
                  style={{ objectFit: "contain" }}
                  width={"20px"}
                />
                {op}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SwipeToSlide;
