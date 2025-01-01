'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const profileFormSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  oldPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters.',
  }),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid mobile number.',
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your backend or local storage
const defaultValues: Partial<ProfileFormValues> = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St, City, Country',
  mobile: '+1234567890',
}

export default function ProfileForm() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    // Send data to your backend
    console.log(data)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar || '/placeholder.svg'} alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0])
                          handleImageChange(e)
                        }}
                      />
                    </FormControl>
                    <FormDescription>Choose a profile picture.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input 
                        type={showOldPassword ? 'text' : 'password'} 
                        placeholder="Your old password" 
                        {...field} 
                      />
                      {/* <button type="button" onClick={() => setShowOldPassword(!showOldPassword)}>
                        {showOldPassword ? 'Hide' : 'Show'}
                      </button> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type={showNewPassword ? 'text' : 'password'} 
                        placeholder="Your new password" 
                        {...field} 
                      />
                      {/* <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? 'Hide' : 'Show'}
                      </button> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="Your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

