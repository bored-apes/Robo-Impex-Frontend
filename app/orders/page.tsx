"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderByUserId } from "@/lib/apiServices/order.service";
import { useAuth } from "@/context/authContext";
import { CURRENCY } from "@/data/constants";
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowLeft,
  Eye,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Order } from "@/types/order";
import { PrivateRoute } from "@/components/auth/privareRoutes";
import { Badge } from "@/components/ui/badge";
import { OrderPageSkeleton } from "@/components/shared/skeletons/orderPageSkeleton";
import { useCustomToast } from "@/components/shared/common/customToast";
import { Pagination } from "@/components/shared/common/pagination";

export default function OrdersPage() {
  return (
    <PrivateRoute>
      <OrdersContent />
    </PrivateRoute>
  );
}

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ordersPerPage = 10;

  const { user } = useAuth();
  const { showToast } = useCustomToast();

  const fetchOrders = useCallback(
    async (page = 1, showRefreshLoader = false) => {
      try {
        if (showRefreshLoader) setIsRefreshing(true);
        else setIsLoading(true);
        const parems = {
          page,
          pageSize: ordersPerPage,
        };
        const response = await getOrderByUserId(user?.id as number, parems);

        if (response.success && response.data) {
          const data = response.data as {
            data: Order[];
            pagination: {
              page: number;
              pageSize: number;
              total: number;
              totalPages: number;
            };
          };

          setOrders(data.data);
          setCurrentPage(data.pagination.page);
          setTotalPages(data.pagination.totalPages);
          setTotalItems(data.pagination.total);
        } else {
          showToast({
            type: "error",
            title: "Error",
            message: response.message || "Failed to fetch orders",
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        showToast({
          type: "error",
          title: "Error",
          message: "Failed to fetch orders",
        });
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [user?.id, showToast]
  );

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 hover:bg-green-200/80";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 hover:bg-yellow-200/80";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 hover:bg-red-200/80";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200 hover:bg-gray-200/80";
    }
  };

  const getShippingStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 hover:bg-green-200/80";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 hover:bg-blue-200/80";
      case "processing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 hover:bg-orange-200/80";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 hover:bg-yellow-200/80";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 hover:bg-red-200/80";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200 hover:bg-gray-200/80";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return <OrderPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#38b6ff]">
                My Orders
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-lg">
                Track and manage your order history
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
             
              <Button
                variant="outline"
                asChild
                className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm bg-transparent hover:bg-accent/10 animate-glow flex-shrink-0"
              >
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="max-w-md sm:max-w-lg w-full p-6 sm:p-8 text-center glass-morphism animate-fade-in-up border-2 border-[#38b6ff]/20">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-[#38b6ff]/10 rounded-full flex items-center justify-center animate-gentle-float">
                  <ShoppingBag className="h-8 sm:h-10 w-8 sm:w-10 text-[#38b6ff]" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    No Orders Yet
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
                    You haven't placed any orders yet. Start shopping to see
                    your orders here.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <Button
                    asChild
                    className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm bg-transparent hover:bg-accent/10"
                  >
                    <Link href="/">
                      <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#38b6ff] glass-morphism hover-lift overflow-hidden">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-[#38b6ff]">
                            Order #{order.id}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <Badge
                              className={`${getPaymentStatusColor(
                                order.payment_status
                              )} text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 glass-morphism transition-colors`}
                            >
                              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
                              {order.payment_status}
                            </Badge>
                            <Badge
                              className={`${getShippingStatusColor(
                                order.shipping_status
                              )} text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 glass-morphism transition-colors`}
                            >
                              <Truck className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" />
                              {order.shipping_status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#38b6ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Product ID
                              </p>
                              <p className="font-medium text-sm sm:text-base">
                                #{order.product_id}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#38b6ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Quantity
                              </p>
                              <p className="font-medium text-sm sm:text-base">
                                {order.quantity} items
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#38b6ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Order Date
                              </p>
                              <p className="font-medium text-sm sm:text-base">
                                {formatDate(order.created_at)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Total Amount
                              </p>
                              <p className="font-bold text-base sm:text-lg text-[#38b6ff]">
                                {CURRENCY.SYMBOL}
                                {order.final_price?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Base Price:
                              </span>
                              <span className="text-sm sm:text-base">
                                {CURRENCY.SYMBOL}
                                {order.base_price?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                GST ({order.gst_rate}%):
                              </span>
                              <span className="text-sm sm:text-base">
                                {CURRENCY.SYMBOL}
                                {order.gst_amount?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Final Price:</span>
                              <span className="text-[#38b6ff] text-sm sm:text-base">
                                {CURRENCY.SYMBOL}
                                {order.final_price?.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            {order.razorpay_order_id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Razorpay Order:
                                </span>
                                <span className="font-mono text-xs sm:text-sm">
                                  {order.razorpay_order_id}
                                </span>
                              </div>
                            )}
                            {order.razorpay_payment_id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Payment ID:
                                </span>
                                <span className="font-mono text-xs sm:text-sm">
                                  {order.razorpay_payment_id}
                                </span>
                              </div>
                            )}
                            {order.transport_id && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Transport ID:
                                </span>
                                <span className="text-sm sm:text-base">
                                  #{order.transport_id}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 gap-2 sm:gap-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground order-1 sm:order-none">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            Ordered on {formatDate(order.created_at)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showInfo={true}
                totalItems={totalItems}
                itemsPerPage={ordersPerPage}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
