import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import moment from 'moment'
import { parseTimeAgo } from "@/helpers/index"

import {
    FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon,
    FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton,
} from 'react-share';
import {
    Send as IconSend,
} from '@material-ui/icons'
import { Spin } from 'antd'
import { Formik, Form, Field } from 'formik'

import Layout from '@/components/mobiles/Layout'


const apiMyDetail = async (session, url) => {
    return axios.get(url,
        {
            responseType: 'json',
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            }
        })
        .then((response) => {
            // console.log('apiMyDetail.response: ' + JSON.stringify(response.data.data));
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
            // console.log('apiMyDetail.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

const apiGroupPost = async (session, url) => {
    return axios.get(url,
        {
            responseType: 'json',
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            }
        })
        .then((response) => {
            // console.log('apiGroupPost.response: ' + JSON.stringify(response.data.data));
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
            // console.log('apiGroupPost.error: ' + JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                return { _error: 1, message: error.message };
            } else {
                return { _error: 1, message: error.message };
            }
        });
}

export default function GroupPost({
    dataHostUrl,
    dataPostId,
    dataMyDetail,
    dataGroupPost,
}) {
    const [mydetail, setMydetail] = useState(null);
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState(null);

    const [comments, setComments] = useState(null);
    const [commentPage, setCommentPage] = useState(1);
    const [commentPageTotal, setCommentPageTotal] = useState(1);
    const [commentLoading, setCommentLoading] = useState(false);

    //==========================================================//
    //=================== COMPONENT - HOOKS ====================//
    //==========================================================//
    useEffect(() => {
        if (typeof dataPostId !== 'undefined' && dataPostId != null && dataPostId != '') {
            setPostId(dataPostId);
        }

        if (!dataMyDetail._error) {
            setMydetail(dataMyDetail.payload);
        }

        if (!dataGroupPost._error) {
            setPost(dataGroupPost.payload.post);
            setComments(dataGroupPost.payload.reply);
            setCommentPage(parseInt(dataGroupPost.payload.current_page));
            setCommentPageTotal(dataGroupPost.payload.total_page);
        }
    }, []);

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    const onClickPostLike = async (post) => {
        if (typeof post !== 'undefined' && post != null) {
            const apiPostLike = await __apiPostLike(post);

            if (!apiPostLike._error) {
                const apiGroupPost = await __apiGroupPost();

                if (!apiGroupPost._error) {
                    setPost(apiGroupPost.payload.post);
                }
            }
        }
    }

    const onSubmitFormComment = async (values) => {
        const comment = values.comment;

        if (comment.length > 4) {
            const apiCommentPost = await __apiCommentPost(comment);

            if (!apiCommentPost._error) {
                const arrComments = comments == null ? [] : comments;
                const objComment = {
                    User: {
                        fullname: mydetail.fullname,
                        profile_picture: mydetail.profile_picture
                    },
                    reply: comment,
                };

                if (Array.isArray(arrComments)) {
                    arrComments.unshift(objComment);
                    arrComments.pop();
                } else {
                    arrComments.push(objComment);
                }

                setComments(arrComments);
            }
            console.log(`apiCommentPost: ${JSON.stringify(apiCommentPost)}`);
        }
    }

    const onLoadmoreComment = useCallback(() => {
        if (commentPageTotal > commentPage) {
            setCommentLoading(true);

            Promise.all([
                __apiGroupPost((commentPage + 1)),
            ]).then(([groupPost]) => {
                if (!groupPost._error) {
                    setComments(comments.concat(groupPost.payload.reply))
                    setCommentPage(parseInt(groupPost.payload.current_page));
                    setCommentPageTotal(groupPost.payload.total_page);
                }

                setCommentLoading(false);
            })
        }
    });

    const onClickPostShare = async (post) => {
        if (typeof post !== 'undefined' && post != null) {
            await __apiPostShare(post);
        }
    }

    //=============================================================//
    //=================== COMPONENT - FUNCTION ====================//
    //=============================================================//
    const __apiGroupPost = async () => {
        if (postId != null) {
            return axios.post(`/group/post/${postId}`,
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

    const __apiPostLike = async (post) => {
        if (post != null) {
            return axios.post(`/group/post/${post.id}/like`,
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

    const __apiCommentPost = async (comment) => {
        if (post != null) {
            return axios.post(`/group/post/${post.id}/comment`,
                { reply: comment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    // console.log('dataForumPost.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('dataForumPost.error: ' + JSON.stringify(error));
                    if (error.response !== undefined && error.response.data !== null) {
                        return { _error: 1, message: error.message };
                    } else {
                        return { _error: 1, message: error.message };
                    }
                });
        }
    }

    const __apiPostShare = async (post) => {
        if (post != null) {
            return axios.post(`/group/post/${post.id}/share`,
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
    const _renderPostCommentItem = (item, index) => {
        const profileFullname = item.User.fullname;
        const profilePicture = item.User.profile_picture;
        const profileComment = item.reply;

        return (
            <div className="flex py-2 px-4" key={`group-comment-${index}`}>
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

    const _renderPostShare = () => {
        const contentURL = `${dataHostUrl}/group/post/${post.id}`;
        const groupTitle = `LinkAja Apa2Bisa - ${post.title}`;
        console.log(post)

        return (
            <div id="post_share">
                <ul className="flex flex-row items-center">
                    <li className="w-8 h-8">
                        <FacebookShareButton url={contentURL} quote={groupTitle} onClick={() => onClickPostShare(post)}>
                            <FacebookIcon size={28} round={true} />
                        </FacebookShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <TwitterShareButton url={contentURL} title={groupTitle} onClick={() => onClickPostShare(post)}>
                            <TwitterIcon size={28} round={true} />
                        </TwitterShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <WhatsappShareButton url={contentURL} title={groupTitle} onClick={() => onClickPostShare(post)}>
                            <WhatsappIcon size={28} round={true} />
                        </WhatsappShareButton>
                    </li>
                    <li className="w-8 h-8">
                        <LinkedinShareButton url={contentURL} title={groupTitle} onClick={() => onClickPostShare(post)}>
                            <LinkedinIcon size={28} round={true} />
                        </LinkedinShareButton>
                    </li>
                </ul>
            </div>
        );
    }

    const _renderContent = () => {
        return (
            <div className="bg-white">
                <div className="py-4 px-4">
                    <div className="w-full h-30 mb-5 rounded-lg overflow-hidden">
                        {post != null && <img className="block w-full h-full rounded-lg object-cover object-center" src={post.picture} alt="" />}
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-blue-400 text-xs">{post != null && post.Group.title}</div>
                        <div className="text-gray-400 text-xs">{parseTimeAgo(moment(post.created_at).unix() * 1000)}</div>
                    </div>
                    <h3 className="font-bold text-base mb-3">{post != null && post.title}</h3>
                    <div className='article' dangerouslySetInnerHTML={{ __html: post != null && post.description }}></div>
                </div>
                {process.env.SHARES_ENABLED ?
                    <div className="px-4 mt-4 mb-8 flex items-center">
                        <div className="mr-3">Bagikan</div>
                        <div className="flex flex-wrap items-center">
                            {_renderPostShare()}
                        </div>
                    </div>
                    : ''
                }
                <div className="flex justify-center items-center mb-4">
                    <a className="block py-2 px-4 rounded-full bg-fair" onClick={() => onClickPostLike(post)}>
                        <div className="h-full">
                            {post.me_like.user_id == null && <img className="inline-block w-5 h-5 mr-1 object-center object-cover" src={`/images/mobiles/ic_love_false.png`} alt={``} />}
                            {post.me_like.user_id != null && <img className="inline-block w-5 h-5 mr-1 object-center object-cover" src={`/images/mobiles/ic_love_true.png`} alt={``} />}
                            <span className="text-xs mr-1">Suka</span>
                            <span className="text-xs">({post.like_count})</span>
                        </div>
                    </a>
                </div>
                <div className="mb-2">
                    {mydetail != null && mydetail.medal_id >= 3 && _renderCommentInput()}
                </div>
                <div className="pb-4">
                    <div className="">
                        {comments != null && comments.length > 0 && comments.map(_renderPostCommentItem)}
                    </div>
                    {!commentLoading && commentPageTotal > commentPage && <a className="block p-4 font-bold text-xs text-center text-linkajared" onClick={() => onLoadmoreComment()}>Lihat Komentar Lainnya</a>}
                    {commentLoading && <div className="flex justify-center items-center p-4"><Spin size="default" /></div>}
                </div>
            </div>
        );
    }

    const _renderLayout = () => {
        return (
            <Layout
                title='LinkAja Apa2Bisa - Group Post'
                headerTitle={`Group Post`}
                headerBack={`/group/category/[id]?id=${post.group_id}`}
                headerBackAs={`/group/${post.group_id}`}>
                {_renderContent()}
            </Layout>
        );
    }

    if (post == null) return null;
    else return _renderLayout();
}


export async function getServerSideProps(ctx) {
    const params = ctx.params;
    const session = ctx.req.session;
    const hostUrl = `${process.env.NEXT_FRONT_URL}`;
    const postId = params.id;
    const myDetailUrlAPI = `${process.env.NEXT_API_URL}/v1/home/my-detail`;
    const myDetail = await apiMyDetail(session, myDetailUrlAPI);
    const postUrlAPI = `${process.env.NEXT_API_URL}/v1/group/post/${postId}`;
    const groupPost = await apiGroupPost(session, postUrlAPI);

    return {
        props: {
            dataHostUrl: hostUrl,
            dataMyDetail: myDetail,
            dataGroupPost: groupPost,
            dataPostId: postId,
        }
    }
}