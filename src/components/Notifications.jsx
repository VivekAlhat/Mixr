import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  HStack,
  Icon,
  DrawerCloseButton,
  VStack,
  Divider,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSession();
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    db.collection("notifications")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const res = snapshot.data();
        const data = !!res && res.notifications;
        setNotifications(data);
      });

    return () => {
      setNotifications(null);
    };
  }, [user.uid]);

  const clearNotifications = () => {
    db.doc(`notifications/${user.uid}`).delete();
  };

  return (
    <>
      <HStack onClick={onOpen}>
        <Icon as={MdNotifications} />
        <Text>Notifications</Text>
      </HStack>
      <Drawer onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt="1.5" />
          <DrawerHeader>Notifications</DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack spacing="3" align="flex-start" mt="3">
              {!!notifications ? (
                notifications.map((item, key) => (
                  <NotificationItem
                    key={key}
                    user={item.user}
                    post={item.post}
                  />
                ))
              ) : (
                <Text>No New Notifications.</Text>
              )}
            </VStack>
          </DrawerBody>
          <Spacer />
          {!!notifications && (
            <Button
              m="5"
              size="lg"
              colorScheme="red"
              onClick={clearNotifications}
            >
              Clear
            </Button>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
