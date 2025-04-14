import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { format } from "date-fns";
import { Link, Stack } from "expo-router";
import { Tables } from "@/src/types/database.types";
import { getMyOrders } from "@/src/api/api";

type Props = {};

const renderItem: ListRenderItem<Tables<"order">> = ({ item }) => (
  <Link
    // href={`/orders/${item.slug}`}
    href={{
      pathname: "/orders/[slug]",
      params: { slug: item.slug },
    }}
    asChild
  >
    <Pressable style={styles.orderContainer}>
      <View style={styles.orderContennt}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}>{item.slug}</Text>
          <Text style={styles.orderDetails}>{item.description}</Text>
          <Text style={styles.orderDate}>
            {format(new Date(item.created_at), "MM dd, yyyy")}
          </Text>
        </View>
        <View
          style={[styles.statusBadget, styles[`statusBadge_${item.status}`]]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

const Orders = (props: Props) => {
  const { data: orders, error, isLoading } = getMyOrders();

  if (isLoading) return <ActivityIndicator />;
  if (error || !orders) return <Text>Error: {error?.message}</Text>;
  if (!orders.length)
    return (
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          textAlign: "center",
          padding: 10,
        }}
      >
        No orders created yet
      </Text>
    );
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContennt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  statusBadget: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge_Pending: {
    backgroundColor: "#ffcc00",
  },
  statusBadge_Completed: {
    backgroundColor: "#4caf50",
  },
  statusBadge_Shipped: {
    backgroundColor: "#2196f3",
  },
  statusBadge_InTransit: {
    backgroundColor: "#ff9800",
  },
});
