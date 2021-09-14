const PostMarginLeft = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const marginLeft = `calc( ( 100vw - ${ postWidth }px - ${ widthBetweenPostAndTrending }px - ${ trendingWidth }px ) / 2)`;
    return marginLeft;
}

const PostMarginRight = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const marginLeft = PostMarginLeft(postWidth, widthBetweenPostAndTrending, trendingWidth);
    const marginRight = `calc( 100vw - ${marginLeft} - ${postWidth}px )`;
    return marginRight;
}

const TrendingMarginLeft = (postWidth, widthBetweenPostAndTrending, trendingWidth) => {
    const postMarginLeft = PostMarginLeft(postWidth, widthBetweenPostAndTrending, trendingWidth);
    const trendingMarginLeft = `calc( 100vw - ${postMarginLeft} - ${trendingWidth}px )`;
    return trendingMarginLeft;
}

export {
    PostMarginLeft,
    PostMarginRight,
    TrendingMarginLeft
}