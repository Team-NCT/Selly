import { TextInput, Label } from "@/components/common";
import { useInputState } from "@/hooks";

const Form = () => {
  const [username, setUsername] = useInputState();

  return (
    <form>
      <Label
        color="ocean"
        height={60}
        horizontal={10}
        id="input-text"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={30}>
        Username
      </Label>
      <TextInput
        handleInputChange={(e: any) => {
          setUsername(e.target.value);
        }}
        id="input-text"
        maxLength={10}
        status={true}
        value={username}
      />
    </form>
  );
};

export default Form;
