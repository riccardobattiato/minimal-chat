import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Contacts from "expo-contacts";
import { Text } from "~/components/ui/text";

export default function Screen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
      }
    })();
  }, []);

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      {contacts.map((contact) => (
        <Text key={contact.id}>
          {contact.name} {contact.firstName} {contact.lastName}
        </Text>
      ))}
    </View>
  );
}
