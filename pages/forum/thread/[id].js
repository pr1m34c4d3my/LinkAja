import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import { parseTimeAgo } from "@/helpers/index"
import {
  FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon,
  FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
} from 'react-share'
import {
  Send as IconSend,
  Attachment as IconAttachment,
} from '@material-ui/icons'
import { Breadcrumb, Input, Card } from 'antd'
import { Spin } from 'antd'
import { Formik, Form, Field } from 'formik'
import Layout from '@/components/desktop/Layout'
import TopThread from '@/components/desktop/forum/TopThread'
import Skeleton from 'react-loading-skeleton'


export default function ForumThread({
  dataHostUrl,
  dataThreadId,
}) {

  const [mydetail, setMydetail] = useState(null);
  const [thread, setThread] = useState(null);

  const [loadingContent, setLoadingContent] = useState(false);

  const [comments, setComments] = useState(null);
  const [commentPageNow, setCommentPageNow] = useState(1);
  const [commentPageTotal, setCommentPageTotal] = useState(1);
  const [commentLoading, setCommentLoading] = useState(false);

  //==========================================================//
  //=================== COMPONENT - HOOKS ====================//
  //==========================================================//
  useEffect(() => {
    const threadId = (typeof dataThreadId == 'undefined' || dataThreadId == "") ? null : dataThreadId;

    if (threadId != null) onInitData();
  }, []);

  //=============================================================//
  //=================== COMPONENT - LISTENER ====================//
  //=============================================================//
  const onInitData = () => {
    setLoadingContent(true);

    Promise.all([
      __apiMyDetail(),
      __apiForumThread(dataThreadId, commentPageNow),
    ])
      .then(([myDetail, forumThread]) => {
        if (myDetail != null && !myDetail._error) {
          setMydetail(myDetail.payload);
        }

        if (forumThread != null && !forumThread._error) {
          setThread(forumThread.payload.thread);
          setComments(forumThread.payload.reply);
          setCommentPageNow(parseInt(forumThread.payload.current_page));
          setCommentPageTotal(forumThread.payload.total_page);
        }
      })
      .catch((err) => {
        setLoadingContent(false);
      });
  }

  const onSubmitFormComment = async (values) => {
    console.log(`formProfile: ${JSON.stringify(values)}`);

    const comment = values.comment;
    const apiCommentPost = await __apiCommentPost(comment);

    console.log(`apiCommentPost: ${JSON.stringify(apiCommentPost)}`);
  }

  const onLoadmoreComment = useCallback(() => {
    if (commentPageTotal > commentPage) {
      setCommentLoading(true);

      Promise.all([
        __apiForumThread((commentPage + 1)),
      ]).then(([forumThread]) => {
        if (!forumThread._error) {
          setComments(comments.concat(forumThread.payload.reply))
          setCommentPage(parseInt(forumThread.payload.current_page));
          setCommentPageTotal(forumThread.payload.total_page);
        }

        setCommentLoading(false);
      })
    }
  });

  //=============================================================//
  //=================== COMPONENT - FUNCTION ====================//
  //=============================================================//
  const __apiMyDetail = async () => {
    return axios.post('/dashboard/my-detail',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return null;
      });
  }

  const __apiForumThread = async (threadId, page) => {
    return axios.post(`/forum/thread/${threadId}?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return null;
      });
  }

  const __apiCommentPost = async (comment) => {
    if (thread != null) {
      return axios.post(`/forum/thread/${thread.id}/reply`,
        { reply: comment },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          // console.log('dataForumThread.response: ' + JSON.stringify(response.data.data));
          if (response.status === 200) {
            const resData = response.data.data;

            const _error = 0;
            const payload = resData;

            return { _error, payload };
          } else {
            return { _error: 1, message: response.data.message };
          }
        })
        .catch(error => {
          // console.log('dataForumThread.error: ' + JSON.stringify(error));
          if (error.response !== undefined && error.response.data !== null) {
            return { _error: 1, message: error.message };
          } else {
            return { _error: 1, message: error.message };
          }
        });
    }
  }

  const __apiThreadShare = async (thread) => {
    if (thread != null) {
      return axios.post(`/forum/thread/${thread.id}/share`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
          return res.data;
        })
        .catch(err => {
          return { _error: true };
        });
    }
  }


  //==========================================================//
  //=================== COMPONENT - RENDER ===================//
  //==========================================================//
  function cardTitleTopThread() {
    return (
      <div className="flex items-center font-bold">
        <div className="mr-2">
          <img src='/images/desktop/hot.png' className='h-4' />
        </div>
        <span>5 Hot Thread</span>
      </div>
    )
  }

  const _renderThreadCommentItem = (item, index) => {
    const profileFullname = item.User.fullname;
    const profilePicture = item.User.profile_picture;
    const profileComment = item.reply;

    return (
      <div className="flex py-2 px-4" key={`forum-comment-${index}`}>
        <div className="w-10 h-10 mr-2 overflow-hidden">
          {profilePicture == null && <img className="block w-full h-full object-cover object-center" src={`/images/mobiles/ic_avatar_default.png`} alt={``} />}
          {profilePicture != null && <img className="block w-full h-full object-cover object-center" src={profilePicture} alt={``} />}
        </div>
        <div className="flex-1 p-2 rounded-lg border border-pearlsoft bg-pearlheavy">
          <h3 className="font-extrabold text-xs">{profileFullname}</h3>
          <p className="text-xs">{profileComment}</p>
        </div>
      </div>
    );
  }

  const _renderCommentInput = () => {
    return (
      <Formik initialValues={{ comment: '' }} onSubmit={onSubmitFormComment} >
        <Form>
          <div className="flex py-3 px-4 border border-l-0 border-r-0 border-pearlsoft bg-white">
            <div className="w-10 h-10 mr-2 rounded-full overflow-hidden">
              {mydetail.profile_picture == null && <img className="block w-full h-full object-cover object-center" src={`/images/mobiles/ic_avatar_default.png`} alt={``} />}
              {mydetail.profile_picture != null && <img className="block w-full h-full object-cover object-center" src={mydetail.profile_picture} alt={``} />}
            </div>
            <div className="flex-1">
              <div className="relative w-full rounded-full border border-pearlsoft bg-pearlheavy">
                <div className="flex w-full">
                  <Field name="comment">
                    {({ field, form, meta }) => (
                      <textarea className="w-full h-full py-2 pl-4 pr-8 rounded-full text-xs bg-pearlheavy" {...field} type="text" rows="1" maxLength="100" placeholder="Tulis Komentar" />
                    )}
                  </Field>
                </div>
                <div className="flex items-center absolute z-10 top-0 right-0 h-full">
                  <button className="h-full px-2 text-icongrey" type="submit">
                    <IconSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    );
  }

  const _renderThreadShare = () => {
    const contentURL = `${dataHostUrl}/forum/thread/${thread.id}`;
    const forumTitle = `LinkAja Apa2Bisa - ${thread.title}`;

    return (
      <div id="post_share">
        <ul className="flex flex-row items-center">
          <li className="w-8 h-8">
            <FacebookShareButton url={contentURL} quote={forumTitle}>
              <FacebookIcon size={28} round={true} logoFillColor={'#fff'} iconBgStyle={{ fill: '#e3211f' }} />
            </FacebookShareButton>
          </li>
          <li className="w-8 h-8">
            <TwitterShareButton url={contentURL} title={forumTitle}>
              <TwitterIcon size={28} round={true} logoFillColor={'#fff'} iconBgStyle={{ fill: '#e3211f' }} />
            </TwitterShareButton>
          </li>
          <li className="w-8 h-8">
            <WhatsappShareButton url={contentURL} title={forumTitle}>
              <WhatsappIcon size={28} round={true} logoFillColor={'#fff'} iconBgStyle={{ fill: '#e3211f' }} />
            </WhatsappShareButton>
          </li>
          <li className="w-8 h-8">
            <LinkedinShareButton url={contentURL} title={forumTitle}>
              <LinkedinIcon size={28} round={true} logoFillColor={'#fff'} iconBgStyle={{ fill: '#e3211f' }} />
            </LinkedinShareButton>
          </li>
        </ul>
      </div>
    );
  }

  const _renderThread = () => {
    return (
      <>
        <div className="mb-5 rounded-lg overflow-hidden">
          {thread != null && <img src={thread.picture} alt="" className="w-full h-auto" />}
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-blue-400 text-xs">{thread != null && thread.Forum.title}</div>
          <div className="text-gray-400 text-xs">{parseTimeAgo(moment(thread.created_at).unix() * 1000)}</div>
        </div>
        <h3 className="font-bold text-base mb-3">{thread != null && thread.title}</h3>
        <div className='article' dangerouslySetInnerHTML={{ __html: thread != null && thread.description }}></div>
      </>
    );
  }

  const _renderContent = () => {
    return (
      <div className='flex'>
        <div className='w-8/12 pr-2'>
          {_renderBreadcrumb()}
          <div className='bg-white rounded-xl p-3 mb-4'>
            {_renderThread()}
            {process.env.SHARES_ENABLED ?
              <div className="my-8 flex items-center">
                <div className="mr-3">Bagikan</div>
                <div className="flex flex-wrap items-center">
                  {_renderThreadShare()}
                </div>
              </div>
              : ''
            }
            <div className="mb-2">
              {mydetail != null && mydetail.medal_id >= 3 && comments != null && _renderCommentInput()}
            </div>
            <div className="pb-4">
              <div className="">
                {comments != null && comments.length > 0 && comments.map(_renderThreadCommentItem)}
              </div>
              {!commentLoading && commentPageTotal > commentPageNow && <a className="block p-4 font-bold text-xs text-center text-linkajared" onClick={() => onLoadmoreComment()}>Lihat Komentar Lainnya</a>}
              {commentLoading && <div className="flex justify-center items-center p-4"><Spin size="default" /></div>}
            </div>
          </div>
        </div>
        <div className='w-4/12 pl-2 mb-5'>
          {/* <Card title={cardTitleTopThread()} className="rounded-lg">
            {hotThread.map((item) => {
              return <TopThread key={item.id} item={item} />
            })}
          </Card> */}
        </div>
      </div>
    );
  }

  const _renderBreadcrumb = () => {
    return (
      <div className="mb-3">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link href='/forum'>
              <a>Forum</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={`/forum/category/[id]?id=${thread.Forum.id}`} as={`/forum/${thread.Forum.id}`}>
              <a>{thread.Forum.title}</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{thread.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  const _renderLayout = () => {
    return (
      <Layout>
        {_renderContent()}
      </Layout>
    );
  }

  if (thread == null) return null;
  else return _renderLayout();
}

export async function getServerSideProps(ctx) {
  const params = ctx.params;
  const hostUrl = `${process.env.NEXT_FRONT_URL}`;
  const threadId = params.id;

  return {
    props: {
      dataHostUrl: hostUrl,
      dataThreadId: threadId,
    }
  }
}