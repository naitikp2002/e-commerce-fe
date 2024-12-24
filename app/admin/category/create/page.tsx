'use client'
import { useCreateCategory } from '@/hooks/queries/use-categories'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
})

type FormValues = z.infer<typeof formSchema>

const CreateCategoryPage = () => {
  const router = useRouter()
  const { mutate: createCategory, isPending } = useCreateCategory()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    createCategory(values, {
      onSuccess: () => {
        router.push('/admin/category/list')
      },
      onError: (error) => {
        console.error('Failed to create category:', error)
      },
    })
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex justify-start items-center mb-6">
        <h1 className="text-2xl font-bold">Create Category</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Category'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/category/list')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateCategoryPage