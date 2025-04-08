import { SearchOutlined } from "../components/Icons";
import Wave from "../components/Wave";
import Button from "../components/Button";

export default function Index() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <Button variant="solid">Solid</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="text" type="submit">
          Text
        </Button>
        <Button
          variant="link"
          href="https://tailwindcss.com/docs/installation/using-vite"
        >
          <SearchOutlined />
          Link
        </Button>
        <Button disabled variant="solid">
          Disabled
        </Button>
        <Button loading variant="outlined">
          Loading
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Button
          className="bg-gray-500"
          shape="circle"
          size="icon"
          variant="solid"
        >
          <SearchOutlined />
        </Button>
        <Button shape="circle" size="icon" variant="outlined">
          <SearchOutlined />
        </Button>
        <Button shape="circle" size="icon" variant="dashed">
          <SearchOutlined />
        </Button>
        <Button shape="circle" size="icon" variant="filled">
          <SearchOutlined />
        </Button>
        <Button shape="circle" size="icon" variant="text">
          <SearchOutlined />
        </Button>
        <Button
          shape="circle"
          size="icon"
          variant="link"
          href="https://tailwindcss.com/docs/installation/using-vite"
          target="_blank"
        >
          <SearchOutlined />
        </Button>
        <Button shape="square" size="icon" loading variant="outlined">
          <SearchOutlined />
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Button className="bg-red-600 hover:bg-indigo-700" variant="solid">
          Solid
        </Button>
        <Button variant="dashed">Search</Button>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Button size="small" variant="solid">
          Solid
        </Button>
        <Button size="medium" variant="solid">
          Solid
        </Button>
        <Button size="large" variant="solid">
          Solid
        </Button>
        <Wave>
          <Button variant="outlined">Outlined</Button>
        </Wave>
      </div>
    </div>
  );
}
