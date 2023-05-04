import { Container, Typography, makeStyles } from "@material-ui/core";
import { Title } from "@material-ui/icons";

type Props = {
	iconPath: string;
	title: string;
	info: string;
	description: string;
};

const useStyles = makeStyles((theme) => ({
	tileContainer: {
		minWidth: 165,
		maxHeight: 164,
		padding: 15,
		display: "flex",
		flexDirection: "column",
		gap: 15,
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
		backgroundColor: "rgba( 255, 255, 255, .10)",
		backdropFilter: "blur(5px)",
		borderRadius: 15,
	},
	titleContainer: {
		display: "flex",
		alignItems: "center",
		padding: 0,
		gap: 5,
	},
}));

export const Tile = ({
	iconPath,
	title,
	info,
	description,
}: Props): JSX.Element => {
	const styles = useStyles();
	return (
		<Container className={styles.tileContainer}>
			<Container className={styles.titleContainer}>
				<img src={iconPath} alt={`$tile-icon`} width={20} />
				<Typography variant="subtitle1">
					<b>{title}</b>
				</Typography>
			</Container>
			<Typography variant="h5">{info}</Typography>
			<Typography variant="body2">{description}</Typography>
		</Container>
	);
};
