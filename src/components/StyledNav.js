import styled from 'styled-components';
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from '@trendmicro/react-sidenav';

// SideNav
const StyledSideNav = styled(SideNav)`
    background-color: #777777 !important;
    border-right: 1px solid #999;
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
    [class*="icon-bar--"] {   
        background-color: #1c2541 !important;
    }
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
    background-color: #777777 !important;
    > [class*="sidenav-navitem--"][class*="selected--"],
    > [class*="sidenav-navitem--"]:hover {
         background-color: rgba(0,0,0,0.15);
       }

    [class*="sidenav-subnav--"] {
       background-color: #777777 !important;
       > [class*="sidenav-subnavitem--"]:hover {
         > [class*="navitem--"] {
             background-color: rgba(0,0,0,0.15);
         }
       }
       > [class*="sidenav-subnavitem--"]:hover[class*="selected--"] {
         > [class*="navitem--"] {
             background-color: rgba(0,0,0,0);
         }
       }
    }
    
`;
// > [class*="expanded--"] {
// > [class*="sidenav-subnav--"] {
//     > [class*="subnavitem--"]:hover {
//         > [class*="navitem--"] {
//                 background-color: rgba(0,0,0,0.15) !important;
//             }
//
//         }
//     }
// }

StyledNav.defaultProps = Nav.defaultProps;
//
// &&[class*="expanded--"] {
//     [class*="sidenav-subnav--"] {
//     > [class*="sidenav-subnavitem--"],
//     > [class*="sidenav-subnavitem--"]:hover {
//         > [class*="navitem--"] {
//                 color: #222;
//             }
//         }
//     > [class*="sidenav-subnavitem--"]:hover {
//         > [class*="navitem--"] {
//                 background-color: #eee;
//             }
//         }
//     > [class*="sidenav-subnavitem--"][class*="selected--"] {
//         > [class*="navitem--"] {
//                 color: #db3d44;
//             }
//         > [class*="navitem--"]::before {
//                 border-left: 2px solid #db3d44;
//             }
//         }
//     }
// }
// && > [class*="sidenav-navitem--"] {
// > [class*="navitem--"] {
//         background-color: inherit;
//         color: #222;
//     }
// }
// && > [class*="sidenav-navitem--"]:hover {
// > [class*="navitem--"] {
//         background-color: inherit;
//     }
// }
// && > [class*="sidenav-navitem--"],
// && > [class*="sidenav-navitem--"]:hover {
// > [class*="navitem--"] {
//         [class*="navicon--"] {
//         &, > * {
//                 color: #666;
//             }
//         }
//         [class*="sidenav-nav-text--"] {
//         &, > * {
//                 color: #222;
//             }
//         }
//     }
// }
// && > [class*="sidenav-navitem--"][class*="highlighted--"],
// && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
// > [class*="navitem--"] {
//         [class*="navicon--"],
//             [class*="navtext--"] {
//         &, > * {
//                 color: #db3d44;
//             }
//         }
//         [class*="sidenav-nav-text--"] {
//             font-weight: 700;
//         }
//     }
// }

// NavItem
const StyledNavItem = styled(NavItem)`
    &&&:hover {
        [class*="navtext--"] {
            color: #222;
        }
    }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
    color: #fff;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
    color: #222;
`;
StyledNavText.defaultProps = NavText.defaultProps;

export {
    StyledToggle as Toggle,
    StyledNav as Nav,
    StyledNavItem as NavItem,
    StyledNavIcon as NavIcon,
    StyledNavText as NavText
};
export default StyledSideNav;
