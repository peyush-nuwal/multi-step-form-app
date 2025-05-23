import Input from "./ui/input";
import Dropdown from "./ui/Dropdown";

const Page1 = ({ userData, handleChange, indianStates, errors }) => {
  return (
    <div className="realitve z-10 min-w-full h-full lg:grid  lg:grid-cols-2  place-items-center p-4 lg:p-6 overflow-visible">
      <h1 className="text-xl lg:text-2xl font-semibold col-span-2 mb-10 place-self-start">
        1. Personal Information
      </h1>
      <Input
        label="Name"
        placeholder="e.g. Bruce Wayne"
        important
        value={userData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        customErrors={errors.name}
      />
      <Input
        label="Email"
        placeholder="e.g. iamBatman@gmail.com"
        important
        type="email"
        value={userData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        validationType="email"
        customErrors={errors.email}
      />
      <Input
        label="Address 1"
        placeholder="e.g. 1007 Mountain Drive"
        important
        type="textarea"
        value={userData.address1}
        onChange={(e) => handleChange("address1", e.target.value)}
        customErrors={errors.address1}
      />
      <Input
        label="Address 2"
        placeholder="Apartment, suite, etc. (optional)"
        type="textarea"
        value={userData.address2}
        onChange={(e) => handleChange("address2", e.target.value)}
      />
      <Input
        label="City"
        placeholder="e.g. Gotham"
        important
        value={userData.city}
        onChange={(e) => handleChange("city", e.target.value)}
        customErrors={errors.city}
      />
      <Input
        label="Zipcode"
        placeholder="e.g. 311401"
        important
        value={userData.zipcode}
        onChange={(e) => handleChange("zipcode", e.target.value)}
        validationType="zip"
        customErrors={errors.zipcode}
      />
      <Dropdown
        label="State"
        placeholder="e.g. 311401"
        important
        options={indianStates}
        onChange={(e) => handleChange("state", e.target.value)}
        customErrors={errors.state}
      />
    </div>
  );
};

export default Page1;
