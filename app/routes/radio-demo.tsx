import { useState } from "react";
import { RadioGroup } from "../templates/radio";
import { SearchOutlined } from "../templates/Icons";

export default function RadioDemo() {
  const [selectedValue, setSelectedValue] = useState(1);
  return (
    <div>
      <div className="p-8 flex gap-4">
        <RadioGroup
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            {
              value: 1,
              label: (
                <div className="gap-1 flex items-center">
                  <SearchOutlined style={{ fontSize: 18 }} />
                  Search
                </div>
              ),
            },
            { value: 2, label: "Option 2" },
            { value: 3, label: "Option 3", disabled: true },
          ]}
        />
      </div>
    </div>
  );
}
