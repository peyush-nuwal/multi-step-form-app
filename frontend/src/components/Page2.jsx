
import AutoCompleteInput from "../components/ui/AutocompleteInput";
import RadioGroup from "./ui/RadioGroup";
const Page2 = ({ educationData, handleEducationChange, colleges, errors }) => {
  return (
    <div className="min-w-full h-fit grid grid-cols-1 lg:grid-cols-2  p-4 lg:p-6">
      <h1 className="text-xl  lg:text-2xl font-semibold col-span-2 mb-10 place-self-start">
        2. Education Details
      </h1>
      {/* You can add different inputs here for page 2 */}
      <div className="col-span-2  w-full h-full">
        <h1 className=" text-lg font-medium">
          1.Are you still studying?{" "}
          <span className="text-red-400 ml-1 text-xl">*</span>
        </h1>
        <RadioGroup
          options={["Yes", "No"]}
          onChange={(value) => handleEducationChange("studying", value)}
          className="ml-2"
          defaultValue="No"
        />

        {educationData.studying == "Yes" && (
          <>
            <h1 className="text-lg  font-medium ">
              2. Where are you studying?{" "}
              <span className="text-red-400 ml-1 text-xl">*</span>
            </h1>
            <AutoCompleteInput
              onChange={(value) => handleEducationChange("school", value)}
              placeholder={"Enter college name"}
              options={colleges}
              errorMessage="Please add collage name"
              customError={errors.college}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page2