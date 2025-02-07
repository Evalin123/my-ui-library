import AntdButton from "../components/AntdButton";
import Button from "../components/Button";

export default function Index() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <Button variant="solid">Solid</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="text">Text</Button>
        <Button variant="link">Link</Button>
        <Button disabled variant="solid">
          Disabled
        </Button>
        <Button loading variant="outlined">
          Loading
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Button shape="circle" size="icon" variant="solid">
          A
        </Button>
        <Button shape="circle" size="icon" variant="outlined">
          A
        </Button>
        <Button shape="circle" size="icon" variant="dashed">
          A
        </Button>
        <Button shape="circle" size="icon" variant="filled">
          A
        </Button>
        <Button shape="circle" size="icon" variant="text">
          A
        </Button>
        <Button shape="circle" size="icon" variant="link">
          A
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
        <AntdButton>Click</AntdButton>
        <button className="bg-indigo-600 hover:not-focus:bg-indigo-700">
          Click Me
        </button>
      </div>
    </div>
  );
}
