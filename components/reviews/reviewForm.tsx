"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Star, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/authContext"
import { useCustomToast } from "@/components/shared/common/customToast"
import { reviewService } from "@/lib/apiServices/review.service"
import { motion } from "framer-motion"
import Link from "next/link"

interface ReviewFormProps {
  productId: number
  onReviewSubmitted?: () => void
  className?: string
}

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .required("Rating is required"),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Review title is required"),
  comment: Yup.string()
    .min(20, "Review must be at least 20 characters")
    .max(1000, "Review cannot exceed 1000 characters")
    .required("Review comment is required"),
})

export function ReviewForm({ productId, onReviewSubmitted, className }: ReviewFormProps) {
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useCustomToast()
  const [hoveredRating, setHoveredRating] = useState(0)

  const formik = useFormik({
    initialValues: {
      rating: 0,
      title: "",
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!isAuthenticated || !user) {
        showToast({
          type: "error",
          title: "Authentication Required",
          message: "Please log in to submit a review",
        })
        return
      }

      try {
        const reviewData = {
          productId,
          userId: user.id,
          rating: values.rating,
          title: values.title,
          comment: values.comment,
        }

        const response = await reviewService.createReview(reviewData)

        if (response.success) {
          showToast({
            type: "success",
            title: "Review Submitted",
            message: "Thank you for your review! It will be published after moderation.",
          })
          resetForm()
          if (onReviewSubmitted) {
            onReviewSubmitted()
          }
        } else {
          showToast({
            type: "error",
            title: "Submission Failed",
            message: response.message || "Failed to submit review. Please try again.",
          })
        }
      } catch (error) {
        showToast({
          type: "error",
          title: "Error",
          message: "An unexpected error occurred. Please try again.",
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  const handleStarClick = (rating: number) => {
    formik.setFieldValue("rating", rating)
  }

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  if (!isAuthenticated) {
    return (
      <Card className={`border-l-4 border-l-primary ${className}`}>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
          <p className="text-muted-foreground mb-4">Please log in to share your experience with this product</p>
          <Button asChild>
            <Link href="/login">Log In to Review</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Star className="h-5 w-5 mr-2 text-primary" />
          Write a Review
        </CardTitle>
        <p className="text-sm text-muted-foreground">Share your experience with this product to help other customers</p>
      </CardHeader>

      <CardContent className="p-4">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Rating *</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || formik.values.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </motion.button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formik.values.rating > 0 && (
                  <>
                    {formik.values.rating} star{formik.values.rating !== 1 ? "s" : ""}
                  </>
                )}
              </span>
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-sm text-destructive">{formik.errors.rating}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Review Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Summarize your experience in a few words"
              className="form-field-glow"
              disabled={formik.isSubmitting}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-destructive">{formik.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Your Review *
            </Label>
            <Textarea
              id="comment"
              name="comment"
              rows={5}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tell us about your experience with this product. What did you like or dislike? How did it meet your expectations?"
              disabled={formik.isSubmitting}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {formik.touched.comment && formik.errors.comment && (
                  <span className="text-destructive">{formik.errors.comment}</span>
                )}
              </span>
              <span>{formik.values.comment.length}/1000</span>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting Review...</span>
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
