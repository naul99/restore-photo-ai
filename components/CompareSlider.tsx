import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({
  original,
  restored,
}: {
  original: string;
  restored: string;
}) => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={original} alt="Ảnh gốc" />}
      itemTwo={
        <ReactCompareSliderImage src={restored} alt="Ảnh đã khôi phục" />
      }
      portrait
      className="flex w-[475px] mt-5"
    />
  );
};
