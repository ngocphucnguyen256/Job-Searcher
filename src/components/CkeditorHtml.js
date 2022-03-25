import PropTypes from 'prop-types';

export default function CkeditorHtml(props) {
    const children = props.children;
    return(
        <div className="ckeditor-html">
            {children}
        </div>
    )

}


CkeditorHtml.propTypes = {
    children: PropTypes.node,
  }
  
  CkeditorHtml.defaultProps = {
    children: null,
  }