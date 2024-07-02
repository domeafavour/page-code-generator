import { Flex } from "@/components/Flex";
import { Button } from "@/components/ui/button";
import { HammerIcon } from "lucide-react";

export function Toolbar() {
  function generate() {}

  return (
    <Flex flexDirection="row" gap={8}>
      <Button size="icon" onClick={generate}>
        <HammerIcon />
      </Button>
    </Flex>
  );
}
