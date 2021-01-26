import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}

export async function getStaticPaths() {

//{id:ファイル名}のオブジェクトの配列を返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

//idと解析されたcontentを返す関数
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}