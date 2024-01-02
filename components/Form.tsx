import Link from 'next/link'
import { FormEvent } from 'react'
import Loading from './Loading'

export type PostType = {
  prompt: string,
  tag: string
}
type FormPropsType = {
  type: string,
  post: PostType,
  submitting: boolean,
  loading?: boolean,
  onTagChange: (tag: string) => void,
  onPromptChange: (prompt: string) => void,
  handleSubmit: (e: FormEvent) => void
}

const Form = (props: FormPropsType) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{props.type} Post </span></h1>
      <p className='desc text-left max-w-md'>
        {props.type} and share amazing propmts with the world, and let your imagination run wild with any AI-Powered platform
      </p>

      {props.loading ?
        <Loading />
        :
        <form
          onSubmit={props.handleSubmit}
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your AI Prompt
            </span>
            <textarea
              value={props.post.prompt}
              placeholder='Write your prompt here...'
              className='form_textarea'
              onChange={(e) => props.onPromptChange(e.target.value)}
              required
              spellCheck="false"
            />
          </label>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Tag {' '}
              <span className='font-normal'>(product, idea, software)</span>
            </span>
            <input
              value={props.post.tag}
              placeholder='tag'
              className='form_input'
              onChange={(e) => props.onTagChange(e.target.value)}
              required
              spellCheck="false"
            />
          </label>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/' className='text-gary-500 text-sm'>
              Cancel
            </Link>
            <button
              type='submit'
              disabled={props.submitting}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {props.submitting ? `${props.type}...` : props.type}
            </button>
          </div>
        </form>
      }
    </section>
  )
}

export default Form