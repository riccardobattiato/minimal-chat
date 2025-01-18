import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Contacts from "expo-contacts";
import ContactEntry from "~/components/contacts/ContactEntry";

export default function Index() {
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
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      {contacts.map((contact) => (
        <ContactEntry key={contact.id} raw={contact} />
      ))}
    </View>
  );
}
