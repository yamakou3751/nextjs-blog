import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head> 
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

//役割：予めgetStaticPropsにidを渡す⇒ビルド時に渡しておかないと、静的生成が出来ない為
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
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}