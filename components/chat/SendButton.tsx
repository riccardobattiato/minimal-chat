import { Button } from "~/components/ui/button";
import { SendHorizonal } from "~/lib/icons/SendHorizontal";
import { BellRing } from "~/lib/icons/BellRing";

type Props = {
  urgent?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
};

const SendButton = ({ urgent, onPress, onLongPress }: Props) => {
  return (
    <Button
      variant={urgent ? "destructive" : "default"}
      size="icon"
      onPress={onPress}
      onLongPress={onLongPress}
      className="rounded-full"
    >
      {urgent ? (
        <BellRing
          className="text-destructive-foreground"
          size={20}
          strokeWidth={1.25}
        />
      ) : (
        <SendHorizonal
          className="text-primary-foreground"
          size={20}
          strokeWidth={1.25}
        />
      )}
    </Button>
  );
};

export default SendButton;
