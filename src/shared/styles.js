import styled from "styled-components";

export const Flex = styled.div`
	display: flex;
	flex-direction: ${ ({column})  => column ? 'column':'row'};
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: baseline;
	align-content: baseline;
    margin-top: ${ ({marginTop})  => marginTop && marginTop};
`;